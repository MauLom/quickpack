import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';


export default function ListaPedidos() {
    return (
        <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            ico
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            ico
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Work" secondary="Jan 7, 2014" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                          ico
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Vacation" secondary="July 20, 2014" />
                </ListItem>
            </List>
        </>
    )
}