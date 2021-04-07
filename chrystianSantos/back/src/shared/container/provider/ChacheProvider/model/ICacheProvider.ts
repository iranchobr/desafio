export interface ICacheProvider {
  save(key: string, value: any): Promise<void>;
  invalidate(key: string): Promise<void>;
  recovery<T>(key: string): Promise<T | null>;
}
