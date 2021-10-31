import FieldContext from './context';
import useForm from './useForm';

function Form({ form, children, onFinish, onFinishFailed }) {
  const [formInstance] = useForm(form);

	formInstance.setCallbacks({
    onFinish,
    onFinishFailed,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formInstance.submit();
      }}
    >
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  );
}

export default Form;
