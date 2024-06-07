import { Box, Button, ListItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { updateBook } from "../service/book";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { imageUpload } from "../service/file";

const BookAdminItem = ({ book, onDelete, onSave }) => {
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
            <Box display="flex" flexDirection="column" position="relative">
                <img src={localBook.cover} alt={localBook.title} style={{ width: 150 }} />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            imageUpload(file).then((res) => {
                                console.log(book.id);
                                setLocalBook({ ...localBook, cover: res.message })
                            }).catch(e => {
                                console.log(e);
                            })
                        }

                    }}
                    style={{ display: 'none' }}
                    id={`avatar-input-${book.id}`}
                />
                <Button>
                    <label
                        htmlFor={`avatar-input-${book.id}`}
                    >
                        <Box display="flex" flexDirection="row">
                            <FileUploadIcon />
                            <Typography>
                                上传封面
                            </Typography>
                        </Box>
                    </label>
                </Button>
            </Box>
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
                    <TextField
                        value={localBook.isbn}
                        variant="standard"
                        label="ISBN"
                        onChange={(e) => {
                            setLocalBook({ ...localBook, isbn: e.target.value });
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
                                    onSave?.();
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