import { List, ListItem, ListItemText } from '@mui/material';

const RankingList = ({ items }) => {
    return (
        <List>
            {items.map((item, index) => (
                <ListItem key={index}>
                    <ListItemText primary={`#${index + 1}: ${item}`} />
                </ListItem>
            ))}
        </List>
    );
};

export default RankingList;