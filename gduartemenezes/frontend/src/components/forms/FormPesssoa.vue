<template>
  <div class="form-pessoa">
    <form action="">
      <div class="form-group">
        <label for="input-nome">Nome:</label>
        <input
          class="form-input"
          type="text"
          name="nome"
          id="no_pessoa"
          v:model="form.no_pessoa"
        />
      </div>
      <div class="form-group">
        <label for="input-email">Email:</label>
        <input
          class="form-input"
          type="email"
          name="email"
          id="no_email"
          v:model="form.no_email"
        />
      </div>
      <div class="form-group">
        <label for="input-endereco">Endereço:</label>
        <input
          class="form-input"
          type="text"
          name="endereco"
          id="no_endereco"
          v:model="form.no_endereco"
        />
      </div>
      <div class="form-group">
        <label for="input-nome">Sexo:</label>
        <b-form-select
          v-model="formAnimal.sexo"
          :options="sexo"
        ></b-form-select>
        <div>
          <label for="input-ativo">Ativo:</label>
          <input type="checkbox" name="ativo" id="ativo" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
