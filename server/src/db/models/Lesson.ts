import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';

export enum LessonStatus {
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no-show'
}

export enum LessonType {
  INDIVIDUAL = 'individual',
  GROUP = 'group'
}

interface LessonAttributes {
  id: number;
  teacherId: number;
  studentId: number;
  startDatetime: Date;
  endDatetime: Date;
  status: LessonStatus;
  lessonType: LessonType;
  location: string | null;
  notes: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface LessonCreationAttributes extends Omit<LessonAttributes, 'id'> {}

class Lesson extends Model<LessonAttributes, LessonCreationAttributes> implements LessonAttributes {
  public id!: number;
  public teacherId!: number;
  public studentId!: number;
  public startDatetime!: Date;
  public endDatetime!: Date;
  public status!: LessonStatus;
  public lessonType!: LessonType;
  public location!: string | null;
  public notes!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Lesson.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    startDatetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDatetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(LessonStatus)),
      allowNull: false,
      defaultValue: LessonStatus.SCHEDULED,
    },
    lessonType: {
      type: DataTypes.ENUM(...Object.values(LessonType)),
      allowNull: false,
      defaultValue: LessonType.INDIVIDUAL,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Lesson',
    tableName: 'lessons',
  }
);

export default Lesson;
