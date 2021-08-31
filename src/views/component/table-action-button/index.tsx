import {Fragment} from "react";
import {Button, UncontrolledTooltip} from "reactstrap";
import {Edit, FileText, Trash} from "react-feather";

interface TableActionButtonProps {
    useDetail?: boolean
    useEdit?: boolean
    useDelete?: boolean
    hasAuthorityToViewDetail?: boolean
    hasAuthorityToEdit?: boolean
    hasAuthorityToDelete?: boolean
    onClickDetail?: () => void
    onClickEdit?: () => void
    onClickDelete?: () => void
}

const TableActionButton = (props: TableActionButtonProps) => {
    return (
        <Fragment>
            {props.hasAuthorityToViewDetail &&
            (props.useDetail &&
                <>
                    <Button color="flat-info"
                            className="btn-icon mr-1"
                            id='tableActionButtonDetail'
                            onClick={props.onClickDetail}>
                        <FileText size={14}/>
                    </Button>
                    <UncontrolledTooltip placement='top' target='tableActionButtonDetail'>
                        Detail
                    </UncontrolledTooltip>
                </>
            )}
            {props.hasAuthorityToEdit &&
            (props.useEdit &&
                <>
                    <Button color="flat-warning"
                            className="btn-icon mr-1"
                            id='tableActionButtonEdit'
                            onClick={props.onClickEdit}>
                        <Edit size={14}/>
                    </Button>
                    <UncontrolledTooltip placement='top' target='tableActionButtonEdit'>
                        Edit
                    </UncontrolledTooltip>
                </>
            )}
            {props.hasAuthorityToDelete &&
            (props.useDelete &&
                <>
                    <Button color="flat-danger"
                            className="btn-icon"
                            id='tableActionButtonDelete'
                            onClick={props.onClickDelete}>
                        <Trash size={14}/>
                    </Button>
                    <UncontrolledTooltip placement='top' target='tableActionButtonDelete'>
                        Hapus
                    </UncontrolledTooltip>
                </>
            )}
        </Fragment>
    )
}

export default TableActionButton