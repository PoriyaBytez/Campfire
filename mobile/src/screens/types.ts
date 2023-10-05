export type DropDownItem = {
  label: string;
  value: string;
};

export enum LoadingState {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  DEFAULT = "DEFAULT" 
}