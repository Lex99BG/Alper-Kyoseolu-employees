import { useState } from "react";

function App() {

  const [file, setFile] = useState();
  const [array,setArray] = useState([]);
  const fileReader = new FileReader();

  const handleOnChange = (e) => {
      setFile(e.target.files[0]);
  };

  const csvFileToArray = string => {
    console.log(string)
    const csvHeader = string.slice(0, string.indexOf("\n")).split(";");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    
    const array = csvRows.map(i => {
      const values = i.split(";");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };

  const handleOnSubmit = (e) => {

      e.preventDefault();
      console.log('Submited')
      if (file) {
          fileReader.onload = function (event) {
            const text = event.target.result;
            csvFileToArray(text);
          };

          fileReader.readAsText(file);
      }
  };
  
  const headerKeys = Object.keys(Object.assign({}, ...array));
  console.log(array)
  return (
    <div>
      <h1>Employee Pairing App</h1>
      <div className="content"> 
        <form>
            <input
                type={"file"}
                id={"csvFileInput"}
                accept={".csv"}
                onChange={handleOnChange}
            />
            <button className="submit" onClick={(e) => { handleOnSubmit(e); }}>Submit</button>
        </form>

        <table>
          <thead>
            <tr key={"header"}>
              {headerKeys.map((key) => (
                <th>{key}</th>
              ))}
            </tr>
            
          </thead>
          
          <tbody>
            {array.map((item) => (
              <tr key={item.id}>
                {Object.values(item).map((val) => (
                  <td>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
