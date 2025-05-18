
import classes from './Modal.module.css'

function Modal(props, onClose){
    return <>
    <div className={classes.backdrop} onClick={onClose}> 

        <dialog
        open
        className={classes.modal}>
            {props.children}
        </dialog>
    </div>
    
    </>
}

export default Modal;