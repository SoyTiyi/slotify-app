export type OnbordingFormFieldType = {
  name: string;
  label: string;
  placeholder: string;
};

export type OnboardingProps = {
  form: any;
  fields: Array<OnbordingFormFieldType>;
  onSubmit: (data: any) => void;
  loading: boolean;
  error: string | null;
};
