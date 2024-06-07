import { Box, Button, ListItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { updateBook } from "../service/book";

const BookAdminItem = ({ book, onDelete }) => {
    const [originalBook, setOriginalBook] = useState(book);
    const [isLocalChanged, setLocalChanged] = useState(false);
    const [localBook, setLocalBook] = useState(book);

    useEffect(() => {
        console.log(JSON.stringify(localBook), JSON.stringify(originalBook));
        console.log(JSON.stringify(localBook) != JSON.stringify(originalBook));
        setLocalChanged(JSON.stringify(localBook) != JSON.stringify(originalBook));
    }, [originalBook, localBook]);

    return (<ListItem>
        <Box display="flex" flexDirection="row">
            <img src={localBook.cover} alt={book.title} style={{ width: 150 }} />
            <Box display="flex" flexDirection="row" gap={10}>
                <Box display="flex" flexDirection="column" gap={3} marginLeft={10}>
                    <TextField
                        value={localBook.title}
                        variant="standard"
                        label="标题"
                        onChange={(e) => {
                            setLocalBook({ ...localBook, title: e.target.value });
                        }} />
                    <TextField
                        value={localBook.author}
                        variant="standard"
                        label="作者"
                        onChange={(e) => {
                            setLocalBook({ ...localBook, author: e.target.value });
                        }}
                    />
                    <TextField
                        type="number"
                        value={localBook.price}
                        variant="standard"
                        label="价格"
                        onChange={(e) => {
                            setLocalBook({ ...localBook, price: Number(e.target.value) });
                        }}
                    />
                </Box>
                <Box display="flex" flexDirection="column" gap={3} marginLeft={10}>
                    <TextField
                        type="number"
                        value={localBook.stock}
                        variant="standard"
                        label="库存"
                        onChange={(e) => {
                            setLocalBook({ ...localBook, stock: Number(e.target.value) });
                        }}
                    />
                    <TextField
                        value={localBook.description}
                        variant="standard"
                        label="描述"
                        onChange={(e) => {
                            setLocalBook({ ...localBook, description: e.target.value });
                        }}
                    />
                </Box>
                <Box display="flex" flexDirection="column" gap={3} marginLeft={10}>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!isLocalChanged}
                        onClick={(e) => {
                            updateBook(localBook.id, localBook)
                                .then(() => {
                                    setOriginalBook(localBook);
                                    setLocalBook(localBook);
                                })
                                .catch(e => {
                                    console.log(e);
                                });
                        }}
                    >
                        保存
                    </Button>
                    <Button variant="contained" color="info" disabled={!isLocalChanged} onClick={(e) => {
                        setLocalBook(originalBook);
                    }}>
                        取消
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => {
                        onDelete?.();
                    }}>删除</Button>
                </Box>
                
            </Box>
        </Box>
    </ListItem>);
};

export default BookAdminItem;