import React, {useCallback, useState} from 'react';
import useStore from "../../../hooks/useStore";
import {Box, Grid, Paper, Typography} from "@material-ui/core";
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import { observer } from 'mobx-react-lite';

const getListStyle = (isDraggingOver: bool) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: 8,
    minHeight: 500,
});

const Dashboard = () => {
    const {boards} = useStore();
    const [newTaskTo, setNewTask] = useState(null)

    const closeDialog = useCallback(() => {
        setNewTask(null);
    }, [setNewTask])

    const onDragEnd = useCallback(event => {
        const {source, destination, draggableId: taskId} = event;

        // boards.selected.moveTask(taskId, source, destination);
    }, [boards]);

    return (
        <Box p={2}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Grid container spacing={3}>
                    {boards?.selected?.sections.map(section => {
                        return (
                            <Grid item key={section.id} xs>
                                <Paper>
                                    <Box p={1} display="flex" alignItems="center" justifyContent="space-between">
                                        <Typography variant='h5'>{section.title}</Typography>
                                        <Button variant="outlined" color="primary" onClick={() => {
                                            setNewTask(section.id);
                                        }}>
                                            ADD
                                        </Button>
                                    </Box>
                                    <Droppable droppableId={section.id.toString()} key={section.id}>
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}>
                                                <Column section={section}/>
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </DragDropContext>
            <NewTaskDialog open={!!newTaskTo} sectionId={newTaskTo} handleClose={closeDialog}/>
        </Box>
    );
};

export default observer(Dashboard);