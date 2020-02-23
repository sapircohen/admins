import React from 'react';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';


const SAlert = (props)=>{
    return (
      <div>
        <SweetAlert
          type={props.alertIcon}
          show={props.show}
          title={props.title}
          text={props.text}
          onConfirm={props.CloseAlert}
          onCancel={props.CancelAlert}
          showCancelButton={props.showCancel}
        />
      </div>
    );
}

export default SAlert;