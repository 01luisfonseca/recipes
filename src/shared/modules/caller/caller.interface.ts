export interface CallerInterface {
  read(input?: any): Promise<any>;
  seed(): Promise<any>;
}
