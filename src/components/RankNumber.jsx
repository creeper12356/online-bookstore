import { Typography } from "@mui/material";

const RankNumber = ({ rank }) => {
    const color = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'orange' : 'darkblue';
    const backgroundColor = rank === 1 ? 'brown' : rank === 2 ? 'darkblue' : rank === 3 ? 'black' : 'gray';
    return (
        <Typography style={{ 
            fontSize: '30px', 
            color, 
            fontWeight: 'bold', 
            textAlign: 'center', 
            borderRadius: '50%', 
            width: '40px', 
            height: '40px', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            background: `radial-gradient(circle at center, ${backgroundColor}, white)`,
        }}>
            {rank}
        </Typography>
    );
};
export default RankNumber;