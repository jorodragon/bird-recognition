export const BirdDetail = (props) => {
  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <img src={props.data.img} className="img-responsive" alt="" />
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>{props.data ? props.data.name : 'Bird detail'}</h2>
              <audio controls>
                <source src={props.data.audio} type="audio/ogg" />
              </audio>
              <p>{props.data ? props.data.description : 'loading...'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
