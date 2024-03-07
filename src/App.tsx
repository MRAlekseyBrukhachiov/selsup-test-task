import './App.css';
import { ChangeEvent, useCallback, useEffect, useState } from "react";

interface Param {
  id: number;
  name: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  // colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface useInputHook {
  value: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const useInput = (initial: string = ""): useInputHook => {
  const [value, setValue] = useState<string>(initial);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value)
  }, []);

  return {value, onChange}
}

interface Prop {
  name: string;
  param: ParamValue;
}

const OneParam: React.FunctionComponent<Prop> = (props) => {
  const value = useInput(props.param.value);

  useEffect(() => {
      props.param.value = value.value;
      console.log(props.param);
  }, [value]);

  return (
      <div>
          <p>{props.name}</p>
          <input {...value} />
      </div>
  );
}

const ParamEditor: React.FunctionComponent<Props> = (props) => {
  const [allProps, setAllProps] = useState<Prop[]>([]);

  const getModel = (): Model => {
      return props.model;
  }

  const getAllFields = (): Prop[] => {
      const allProps: Prop[] = []

      props.params.forEach(item => {
          const param = props.model.paramValues.find(e => e.paramId === item.id);
          if (param) {
              allProps.push({ name: item.name, param });
          }
      });

      return allProps;
  }

  useEffect(() => {
      setAllProps(getAllFields);
  }, []);

  return (
      <>
          {allProps.map((e, i) => {
              return <OneParam key={i} {...e}/>
          })}
      </>
  )
}

function App() {
  const params: Param[] = [
    {
      id: 1,
      name: "Наименование"
    },
    {
      id: 2,
      name: "Длина"
    }
  ]
  
  const model: Model = {
    paramValues: [
      {
        paramId: 1,
        value: "повседневное"
      },
      {
        paramId: 2,
        value: "макси"
      }
    ]
  }

  return (
    <div className="App">
     <ParamEditor params={params} model={model}/>
    </div>
  );
}

export default App;
