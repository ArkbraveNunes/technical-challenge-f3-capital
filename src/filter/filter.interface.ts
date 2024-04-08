export interface IFilter<I, O> {
  filter(input: I): O;
}
