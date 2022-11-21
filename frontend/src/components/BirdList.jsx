import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from './Loading';

export const BirdList = (props) => {
  const navigate = useNavigate();
  
  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Khám phá</h2>
          <p>Cùng tìm hiểu những loài chim rất quen thuộc tại Việt Nam</p>
        </div>
        <div id="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-3 col-sm-6 team">
                  <div className="thumbnail">
                    {' '}
                    <img
                      src={d.img}
                      alt="..."
                      className="team-img"
                      onClick={() => navigate(`/detail/${i}`)}
                    />
                    <div className="caption">
                      <h4>{d.name}</h4>
                      <p>{`${d.description.substring(0, 80)}...`}</p>
                    </div>
                  </div>
                </div>
              ))
            : 'loading'}
        </div>
      </div>
      {/* {props.hasShowMore && (
        <>
          {props.isShowMore ? (
            <Loading />
          ) : (
            <div>
              <button className="btn btn-primary">
                Show more{' '}
                <i className="fa fa-angle-down" aria-hidden="true"></i>
              </button>
            </div>
          )}
        </>
      )} */}
    </div>
  );
};
