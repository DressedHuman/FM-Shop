import PropTypes from 'prop-types';
import tick from '../../../assets/tick.svg';
import cross from '../../../assets/cross.svg';
import { useState } from 'react';

const Checkbox = ({ defaultChecked = false, onChange, size = 'medium', showCross = true, disabled = false }) => {
    const [checked, setChecked] = useState(defaultChecked || false);

    const handleClick = () => {
        if (disabled === true) {
            return
        }
        setChecked(!checked);
        onChange();
    }
    return (
        <div
            onClick={handleClick}
            className={`aspect-square select-none cursor-pointer ${disabled ? '' : 'hover:scale-150'} duration-75
                ${size === 'small' ? 'w-4 border-[1.5px] p-[1px] rounded' :
                    size === 'medium' ? 'w-5 border-[2px] p-[2px] rounded-md' :
                        size === 'large' ? 'w-7 border-[2px] p-[1px] rounded-md' : 'w-5 border-[2px] p-[2px] rounded-md'}
            `}
            style={{ borderColor: disabled ? '#5B58AD' : 'black' }}
            draggable={false}
        >
            {
                checked ?
                    <img
                        src={tick}
                    />
                    :
                    showCross ? <img src={cross} /> : ''
            }
        </div>
    );
};

Checkbox.propTypes = {
    defaultChecked: PropTypes.bool,
    onChange: PropTypes.func,
    size: PropTypes.string,
    showCross: PropTypes.bool,
    disabled: PropTypes.bool,
}

export default Checkbox;