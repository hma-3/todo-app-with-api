import { ChangeEvent, FC, FormEvent, useEffect, useRef } from 'react';
import cn from 'classnames';
import './TodoHeader.scss';

interface Props {
  todosAmount: number;
  activeTodosAmount: number;
  isFocusedInput: boolean;
  newTodoTitle: string;
  onTitleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isLoadingSubmit: boolean;
  onSubmitForm: (event: FormEvent<HTMLFormElement>) => void;
  onToggleAllTodos: () => void;
}

export const TodoHeader: FC<Props> = ({
  todosAmount,
  activeTodosAmount,
  isFocusedInput,
  newTodoTitle,
  onTitleChange,
  isLoadingSubmit,
  onSubmitForm,
  onToggleAllTodos,
}) => {
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocusedInput) {
      newTodoField.current?.focus();
    }
  }, [isFocusedInput, todosAmount]);

  return (
    <header className="todoapp__header">
      {!!todosAmount && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: activeTodosAmount === 0,
          })}
          aria-label="ToggleAllTodos"
          data-cy="ToggleAllButton"
          onClick={onToggleAllTodos}
        />
      )}

      <form onSubmit={onSubmitForm}>
        <input
          ref={newTodoField}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={onTitleChange}
          disabled={isLoadingSubmit}
        />
      </form>
    </header>
  );
};
