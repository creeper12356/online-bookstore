import { Button } from "@mui/material";
import { DateRangePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";

const SimpleDateRangePicker = ({onRangeChanged}) => {
    const [searchArgs, setSearchArgs] = useState({ from: null, to: null });
    useEffect(() => {
        onRangeChanged?.(searchArgs.from, searchArgs.to);
    }, [searchArgs]);
    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }} >
            <Button onClick={() => {
                setSearchArgs({ ...searchArgs, from: null, to: null });
            }}>清除</Button>
            <DateRangePicker
                value={[searchArgs.from, searchArgs.to]}
                localeText={{ start: '开始日期', end: '结束日期' }}
                onChange={(value) => {
                    console.log(value)
                    setSearchArgs({ ...searchArgs, from: value[0]?.startOf('day') ?? null, to: value[1]?.endOf('day') ?? null });
                }}
                disableFuture
            />
        </div>
    </LocalizationProvider>;
};

export default SimpleDateRangePicker;