import { useEffect, useState } from 'react';
import axios from 'axios';
import JsonData from '../data/data.json';
import { useNavigate } from 'react-router-dom';
import { Loading } from './Loading';

export const Header = (props) => {
  const navigate = useNavigate();
  const [file, setFile] = useState({ name: 'Nhập file' });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('')

  const handleChangeFile = (e) => {
    if (e.target.files?.[0]) {
      setIsLoading(true);
      setFile(e.target.files?.[0]);
    }
  };

  useEffect(async () => {
    try {
      if (file?.size) {
        const formData = new FormData();
        formData.append('file', file);
        const result = await axios.post(
          'http://localhost:8000/api/predict',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        if (result?.data) {
          const index = JsonData.birds.findIndex(
            ({ class: className }) => className === result?.data?.bird,
          );

          if (index > -1) {
            navigate(`/detail/${index}`);
          }else{
            setErrorMsg(`${result?.data?.bird || ''}. Please select an other file!`)
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [file]);

  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                {isLoading ? (
                  <div>
                    <p
                      style={{
                        marginBottom: 10,
                      }}
                    >
                      Đang phân tích...
                    </p>
                    <Loading />
                  </div>
                ) : (
                  <div>
                    <div>
                      <p
                        style={{
                          marginBottom: 10,
                        }}
                      >
                        Tải lên tệp WAV (tối đa 16 MB) để khám phá.
                      </p>
                      <input
                        type="text"
                        className={`form-control ${errorMsg ? `form-invalid` : ''}`}
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder={file?.name}
                        style={{
                          padding: '11px 30px',
                          borderRadius: 25,
                          height: 44,
                          width: 600,
                          margin: 'auto',
                        }}
                        contentEditable={false}
                        disabled
                      />
                      {errorMsg && <div class="invalid-feedback" style={{fontWeight: 'bold'}}>{errorMsg}</div>}
                      <input
                        onChange={handleChangeFile}
                        type="file"
                        style={{ display: 'none' }}
                        id="file"
                        accept=""
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: 22,
                      }}
                    >
                      <label
                        htmlFor="file"
                        className="btn btn-custom btn-lg page-scroll mt-3"
                        style={{ fontSize: 14 }}
                      >
                        Tải lên
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
