import React, { useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import IconButton from "./IconButton";
import { images } from "../image";
import Input from "./Input";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.itemBackground};
  border-radius: 10px;
  padding: 5px;
  margin: 3px 0px;
`;

const Contents = styled.Text`
  flex: 1;
  font-size: 24px;
  color: ${({ theme, completed }) => (completed ? theme.done : theme.text)};
  text-decoration-line: ${({ completed }) =>
    completed ? "line-through" : "none"};
`;

const Task = ({ item, deleteTask, toggleTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.text);

  const _handleUpdateButtonPress = () => {
    setIsEditing(true);
  };

  const _onSubmitEditing = () => {
    if (isEditing) {
      const editedTask = Object.assign({}, item, { text });
      setIsEditing(false);
      updateTask(editedTask);
    }
  };

  return isEditing ? (
    <Input
      value={text}
      onChangeText={({ text }) => setText(text)}
      onSubmitEditing={_onSubmitEditing}
    />
  ) : (
    <Container>
      <IconButton
        type={item.complete ? images.complete : images.uncompleted}
        id={item.id}
        onPressOut={toggleTask}
        completed={item.complete}
      />
      <Contents completed={item.complete}>{item.text}</Contents>
      {item.complete || (
        <IconButton type={images.edit} onPressOut={_handleUpdateButtonPress} />
      )}
      <IconButton
        type={images.delete}
        onPressOut={deleteTask}
        id={item.id}
        completed={item.complete}
      />
    </Container>
  );
};

Task.propTypes = {
  item: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default Task;
