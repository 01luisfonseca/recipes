// export interface CallerInterface<TypeInput, TypeResponse> {
//   read(input: TypeInput): Promise<TypeResponse>;
// }

export interface CallerInterface {
  read(input): Promise<any>;
}