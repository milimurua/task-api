import { pool } from '../libs/postgres.js';

class TaskService {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error('Unexpected error on idle client', err));
  }

  async create(taskData) {
    try {
      const { name, day, book, task } = taskData;
      const result = await this.pool.query(
        'INSERT INTO tasks (name, day, book, task) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, day, book, task]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const result = await this.pool.query('SELECT * FROM tasks');
      return result.rows;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  async findOne(id) {
    try {
      const result = await this.pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        throw new Error('Task not found');
      }
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching task:', error);
      throw error;
    }
  }

  async update(id, changes) {
    try {
      const { name, day, book, task } = changes;
      const result = await this.pool.query(
        'UPDATE tasks SET name = $1, day = $2, book = $3, task = $4 WHERE id = $5 RETURNING *',
        [name, day, book, task, id]
      );
      if (result.rows.length === 0) {
        throw new Error('Task not found');
      }
      return result.rows[0];
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const result = await this.pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
        throw new Error('Task not found');
      }
      return { message: 'Task deleted', id };
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}

export default TaskService;
