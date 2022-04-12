import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(private lessonSevice: LessonService) {}
  @Query((returns) => LessonType)
  lesson() {
    return {
      id: '12321414',
      name: 'Physics Class',
      startDate: new Date(),
      endDate: new Date(),
    };
  }

  @Mutation((returns) => LessonType)
  createLesson(
    @Args('name') name: string,
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ) {
    return this.lessonSevice.createLesson(name, startDate, endDate);
  }
}
