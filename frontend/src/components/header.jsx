import { useState } from "react";

export const Header = (props) => {
  const [file, setFile] = useState()

  const handleChangeFile = (e) => {
    if(e.target.files?.[0]) setFile(e.target.files?.[0])
  }

  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
             <div>
             <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter file" style={{padding: '11px 30px', borderRadius:25, height:44, width:600, margin:'auto'}} />
              <input type="file" style={{display:'none'}} id="file" accept=""/>
             </div>
                {/* <h1>
                  {props.data ? props.data.title : 'Loading'}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : 'Loading'}</p> */}
              
                <div style={{display:'flex', justifyContent:'center', marginTop:22}}>
                <label for="file" className='btn btn-custom btn-lg page-scroll mt-3' style={{fontSize: 14}}>
                Upload File
                </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
