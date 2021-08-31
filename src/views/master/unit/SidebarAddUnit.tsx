// @ts-ignore
import Sidebar from '@components/sidebar'
import classnames from 'classnames'
import {useForm} from 'react-hook-form'
import {Button, FormGroup, Label, FormText, Form, Input} from 'reactstrap'
import {unitApiService} from "../../../apiservice/unit";
import {useDispatch} from "react-redux";
import {setPageOfUnit} from "../../../redux/actions/unit";


const SidebarAddUnit = ({open, toggleSidebar, onCreateSuccess, closeOnSuccess, closeOnError}) => {

    const {register, errors, handleSubmit} = useForm()

    const onSubmit = (data) => {
        console.log(data)

        unitApiService.createUnit({
            name: data.name
        })
            .then(response => {
                console.log(response)
                onCreateSuccess()
                closeOnSuccess()
            })
            .catch(error => {
                console.log('create unit', error?.response?.data)
                closeOnError(error?.response?.data?.message)
            })
    }

    return (
        <Sidebar
            size='lg'
            open={open}
            title='Satuan Baru'
            headerClassName='mb-1'
            contentClassName='pt-0'
            toggleSidebar={toggleSidebar}
        >
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label for='name'>
                        Nama <span className='text-danger'>*</span>
                    </Label>
                    <Input
                        autoFocus
                        name='name'
                        id='name'
                        placeholder=''
                        innerRef={register({required: true})}
                        className={classnames({'is-invalid': errors['name']})}
                    />
                </FormGroup>
                <Button type='submit' className='mr-1' color='primary'>
                    Simpan
                </Button>
                <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
                    Batal
                </Button>
            </Form>
        </Sidebar>
    )
}

export default SidebarAddUnit