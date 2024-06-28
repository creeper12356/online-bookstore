import { Typography } from "@mui/material"

const PriceNumber = ({price}) => {
    return <Typography variant="h6" color="red">{`¥${price / 100} `}</Typography>;
}

export default PriceNumber;