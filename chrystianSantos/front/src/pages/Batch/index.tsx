import { FormHandles } from '@unform/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { AiOutlineDelete } from 'react-icons/ai';
import { Input } from '../../component/Input';
import { api } from '../../services/api';
import { Container, Form, Table, ContainerButton } from './styles';

interface IBatch {
  id: string;
  name: string;
  description: string;
}

export function Batch() {
  const formRef = useRef<FormHandles>(null);
  const [batchs, setBatchs] = useState<IBatch[]>([]);
  const [batchSelect, setBatchSelect] = useState<IBatch | null>(null);
  const [labelButton, setLabelButton] = useState<string>('Cadastrar');

  useEffect(() => {
    async function getBatch() {
      const { data } = await api.get('/batch');
      setBatchs(data);
    }
    getBatch();
  }, []);

  const handleFormSubmit = useCallback(
    async (batchForm: IBatch, { reset }) => {
      const objSave = {
        name: batchForm.name,
        description: batchForm.description,
      };
      if (labelButton === 'Cadastrar') {
        try {
          const { data } = await api.post('/batch', objSave);
          setBatchs([...batchs, data]);
          reset();
          toast.success('Lote criado com sucesso');
        } catch (error) {
          toast.error('Ocorreu um problema ao criar lote, tente novamente');
        }
        reset();
        return;
      }
      try {
        const { data } = await api.put(`/batch/${batchSelect?.id}`, objSave);

        const newBatchs = batchs.filter(batch => batch.id !== batchSelect?.id);
        setBatchs([...newBatchs, data]);
        reset();
        toast.success('Lote editado com sucesso');
      } catch (error) {
        toast.error('Ocorreu um erro ao editar lote, tente novamente ');
      }
    },
    [batchs, batchSelect, labelButton],
  );

  const handleDeleteBatch = useCallback(
    async (idBatch: string) => {
      try {
        await api.delete(`/batch/${idBatch}`);
        const newArrayBatch = batchs.filter(batch => batch.id !== idBatch);
        setBatchs(newArrayBatch);
        toast.success('Lote deletado com sucesso');
      } catch (error) {
        toast.error('Ocorreu um problema ao deletar lote, tente novamente');
      }
    },
    [batchs],
  );

  const handleResetForm = useCallback(() => {
    setBatchSelect(null);
    setLabelButton('Cadastrar');
    formRef.current?.reset();
  }, []);

  const handleChangeBatch = useCallback((batch: IBatch) => {
    setLabelButton('Editar');
    setBatchSelect(batch);
  }, []);

  return (
    <Container>
      <h1>Lotes</h1>
      <Form
        ref={formRef}
        initialData={batchSelect || {}}
        onSubmit={handleFormSubmit}
      >
        <div className="nameDescription">
          <Input
            id="name"
            nameInput="name"
            nameLabel="Nome"
            type="text"
            placeholder="Nome"
          />
          <Input
            id="description"
            nameInput="description"
            nameLabel="Descrição"
            type="text"
            placeholder="Descrição"
          />
        </div>
        <ContainerButton>
          <button type="submit">{labelButton}</button>

          {batchSelect && (
            <button type="button" onClick={handleResetForm}>
              Cancelar
            </button>
          )}
        </ContainerButton>
      </Form>

      {batchs.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Descrição</th>
              <th scope="col">Editar/Deletar</th>
            </tr>
          </thead>
          <tbody>
            {batchs.map(batch => (
              <tr key={batch.id}>
                <th>{batch.name}</th>
                <td>{batch.description}</td>
                <td>
                  <button
                    onClick={() => handleChangeBatch(batch)}
                    type="button"
                  >
                    <FiEdit size="20" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteBatch(batch.id)}
                  >
                    <AiOutlineDelete size="20" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
