import {Button} from "@mui/material";

const ValueCounter = ({label, value}) => {
    return (
        <Button style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f0f0f0',
            borderRadius: '5px',
            padding: '12px',
        }}>
            <div style={{
                fontSize: '20px',
                fontWeight: 'bold',
            }}>
                {value}
            </div>
            <div style={{
                fontSize: '12px',
                color: 'grey',
            }}>
                {label}
            </div>
        </Button>
    )
};
export default ValueCounter;
