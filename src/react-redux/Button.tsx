import * as React from 'react';
import classNames from 'classnames';

interface ButtonType {
    isActive: boolean,
    status: "danger" | "success" | "info",
    children: string,
    type: "button" | "submit" | "reset",
    onClick: () => void
}

class Button extends React.Component<ButtonType>{
    render() {
        const { status, children, onClick, type, isActive } = this.props;
        return (
            <button type={type} onClick={onClick} className={
                classNames(
                    status == 'danger' ? Type.danger : status == 'success' ? Type.success : Type.info,
                    isActive == true ? Status.ACTIVE : Status.NOT_ACTIVE
                )} >
                {children}
            </button>
        )
    }
}

const Status = {
    ACTIVE: 'button_active',
    NOT_ACTIVE: 'button_not_active'
}

export const Type = {
    info: 'info',
    danger: 'danger',
    success: 'success',
}

export default Button;