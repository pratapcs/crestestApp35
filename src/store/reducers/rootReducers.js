import { combineReducers } from 'redux';
import { AuthReducer } from './AuthReducer';
import { CommonReducer } from './CommonReducer';
import { DashboardReducer } from './DashboardReducer';
import { ExamCategoryReducer } from './ExamCategoryReducer';

// import { BoardReducer } from './BoardReducer';
import { ClassStandardReducer } from './ClassStandardReducer';
import { BranchScholasticReducer } from './BranchScholasticReducer';
import { ChapterReducer } from './ChapterReducer';
import { DemoExamReducer } from './DemoExamReducer';
import { StudentReducer } from './StudentReducer';
import { ExamTypeReducer } from './ExamTypeReducer';
import { SubscribeReducer } from './SubscribeReducer';
import { SubjectReducer } from './SubjectReducer';
import { OnlineExamReducer } from './OnlineExamReducer';
import { PerformanceScoreReducer } from './PerformanceScoreReducer';
import { ElibraryReducer } from './ElibraryReducer';
import { ProfileReducer } from './ProfileReducer';
import { AcademicReducer } from './AcademicReducer';
import { ArchivePerformanceScoreReducer } from './ArchivePerformanceScoreReducer';
// import PostsReducer from './PostsReducer';
// import todoReducers from './Reducers';

const rootReducers = combineReducers({
	auth: AuthReducer,
	dashboard: DashboardReducer,
	common: CommonReducer,
	category: ExamCategoryReducer,

	// board: BoardReducer,
	standard: ClassStandardReducer,
	branch: BranchScholasticReducer,
	chapter: ChapterReducer,
	questionNo: DemoExamReducer,
	student: StudentReducer,
	examtype: ExamTypeReducer,
	subscribe: SubscribeReducer,
	subject: SubjectReducer,
	onlineexam: OnlineExamReducer,
	performance: PerformanceScoreReducer,
	elibrary: ElibraryReducer,
	profile: ProfileReducer,
	// posts: PostsReducer,
	// todoReducers
	academic:AcademicReducer,
	archivePerformance:ArchivePerformanceScoreReducer,

})

export default rootReducers;