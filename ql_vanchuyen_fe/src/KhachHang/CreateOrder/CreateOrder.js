import React from 'react';
import { memo, useState } from 'react';

const CreateOrder = () => {

    const [formState, setFormState] = useState({
        id, loaiHangHoa, tenHangHoa, 
    })

    return (
        <div className='createorder_container'>
            <div className='form_create' style={{backgroundColor: 'white'}}>
                <form>
                    <div className='form-create-outline md-4' disabled>
                        <input type="text" id="idOrder" name="id" value={}/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default memo(CreateOrder);