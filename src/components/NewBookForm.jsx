import { Box, TextField, Button, Typography, Divider } from "@mui/material";
import { imageUpload } from "../service/file";
import { useState } from "react";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { createBook } from "../service/book";

const NewBookForm = ({  onSaved, onCanceled }) => {

    const [localBook, setLocalBook] = useState({stock: 0, price: 0 , cover: '' });
    const handleSubmit = (e) => {
        e.preventDefault();
        createBook(localBook)
            .then((res) => {
                setLocalBook(localBook);
                onSaved?.({ ...localBook, id: res.id });
            })
            .catch(e => {
                console.log(e);
            });
    };
    return (
        <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="row" marginBottom={10}>
                <Box display="flex" flexDirection="column" position="relative">
                    <img src={localBook.cover} alt={localBook.title} style={{ width: 150 }} />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                imageUpload(file).then((res) => {
                                    setLocalBook({ ...localBook, cover: res.message })
                                }).catch(e => {
                                    console.log(e);
                                })
                            }

                        }}
                        style={{ display: 'none' }}
                        id={`avatar-input-new`}
                    />
                    <Button>
                        <label
                            htmlFor={`avatar-input-new`}
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
                            required
                            onChange={(e) => {
                                setLocalBook({ ...localBook, title: e.target.value });
                            }}
                        />
                        <TextField
                            value={localBook.author}
                            variant="standard"
                            label="作者"
                            required
                            onChange={(e) => {
                                setLocalBook({ ...localBook, author: e.target.value });
                            }}
                        />
                        <TextField
                            type="number"
                            value={localBook.price}
                            variant="standard"
                            label="价格"
                            required
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
                            required
                            onChange={(e) => {
                                setLocalBook({ ...localBook, stock: Number(e.target.value) });
                            }}
                        />
                        <TextField
                            value={localBook.description}
                            variant="standard"
                            label="描述"
                            required
                            onChange={(e) => {
                                setLocalBook({ ...localBook, description: e.target.value });
                            }}
                        />
                        <TextField
                            value={localBook.isbn}
                            variant="standard"
                            label="ISBN"
                            required
                            onChange={(e) => {
                                setLocalBook({ ...localBook, isbn: e.target.value });
                            }}
                        />
                    </Box>
                    <Box display="flex" flexDirection="column" gap={3} marginLeft={10}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            
                        >
                            保存
                        </Button>
                        <Button variant="contained" color="info" onClick={(e) => {
                            onCanceled?.();
                        }}>
                            取消
                        </Button>
                    </Box>

                </Box>
            </Box>
            <Divider />
        </form> 

    );
};
export default NewBookForm;