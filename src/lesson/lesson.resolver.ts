import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(private lessonSevice: LessonService) {}

  @Query((returns) => [LessonType])
  lessons() {
    return this.lessonSevice.getAllLesson();
  }

  @Query((returns) => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonSevice.getLesson(id);
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
