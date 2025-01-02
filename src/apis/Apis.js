//param - email,password
export const LOGIN_API = "lms/login";

//param - null
export const GET_CLASS_STANDARD_LIST_API = "lms/master/getclasseslist";

//param - null
export const GET_BOARD_LIST_API = "lms/master/getboardslist";

//param - board
export const POST_SCHOOL_LIST_API = "lms/master/getschoollist";

//param - email, mobile
export const POST_CHECK_STUDENT_RECORD_EXIST_IN_THE_SYSTEM_OR_NOT_API = "lms/checkuserexist";

//param - email
export const POST_FORGET_PASSWORD_API = "lms/forgetpassword";

//param - email, mobile
export const POST_SEND_VERIFICATION_OTP_TO_MOBILE_AND_EMAIL_API = "lms/send_verification_otp";

//param - email, password,fname, lname, dob, profile_pic, 
//gender, address, pincode, standard, board, school_name, school_address
export const POST_REGISTER_NEW_STUDENT_API = "lms/registration";

//param - email, fname, lname, dob,standard, board, academics,
export const POST_NEW_SCREEN_REGISTER_NEW_STUDENT_API = "lms/student_registration";

//param - null
export const POST_DEMO_STUDENT_LOGIN_API = "lms/demologin";

// ________________________________________________________

//param - null
export const GET_BRANCH_SCHOLASTIC_LIST_API = "lms/master/getbranchscholasticlist";

//param - branch_id
export const GET_CHAPTERS_LIST_FOR_SCHOLATIC_API = "lms/master/getchapterslist";

//param - branch_id
export const GET_BRANCH_ID_BY_CHAPTERS_LIST_API = "lms/elibrary/getchaptersbybranch";

//param - board, standard, branch, chapter
export const GET_DEMO_SCHOLASTIC_EXAM_QUESTIONS_API = "lms/exams/demoexamscholatic";

//param - board, standard, branch, chapter
export const GET_DEMO_COMPETITIVE_EXAM_QUESTIONS_API = "lms/exams/demoexamcompetitive";

//param - examdata[question_id, question_no, guest_post_ans, guest_post_ans_status]
export const POST_STORE_DEMO_EXAM_QUESTIONS_ANSWERS_API = "lms/exams/storedemoexamanswers";



//param - password
export const POST_UNLOCK_SCREEN_API = "lms/unlockscreen";

//param - null
export const POST_VALIDATE_TOKEN_API = "lms/checktokenvalidity";


//param - student_id
export const POST_GENRATE_AND_DOWNLOAD_PDF_API = "lms/exams/demoexamassesmentpdf";

//param - null
export const POST_GET_EXAM_CATEGORIES_API = "lms/getexamcategories";

export const GET_PURCHASED_GROUP_LIST = "lms/exams/getpurchased_grouplist"

//param - exam_category
export const POST_GET_EXAM_TYPE_API = "lms/getexamtype";

//param - student_id
export const GET_PURCHASE_EXAM_TYPE_API = "lms/subscribe/e_library_purchased_subject_list_competitive";

//param - board_id,class, student_id
export const POST_GET_EXAM_SCHOLASTIC_DETAILS_API = "lms/subscribe/getexamscholasticdetails";

//param - student_id
export const POST_DEMO_ASSESSMENT_EXAM_LIST_API = "lms/exams/demoexamassessmentlist";

//param - student_id, exam_unique_id
export const POST_PURCHASED_SUBJECTS_LIST_AGAINST_EXAM_CODE_AND_STUDENT_ID_API = "lms/exams/getpurchased_subjectslist";

//param - student_id
export const PURCHASED_E_LIBRARY_SUBJECTS_LIST_API = "lms/subscribe/e_library_purchased_subject_list";

//param - student_id
export const GET_ALL_SUBJECT_LIST_API = "lms/getallsubject";

//param - subject_id
export const POST_BRANCH_LIST_AGAINST_SUBJECT_ID_API = "lms/exams/getbranchlist_bysubject";

//param - exam_type,class_id, student_id
export const POST_GET_EXAM_COMPETITIVE_DETAILS_API = "lms/subscribe/getexamcompetitivedetails";

//param - exam_type,class_id, student_id
export const GET_ONLY_ELIBRARY_EXAM_COMPETITIVE_DETAILS_API = "lms/subscribe/e_library_subscription_list_competetive";

//param - board_id,class_id
export const GET_ONLY_ELIBRARY_EXAM_SCHOLASTIC_DETAILS_API = "lms/subscribe/e_library_subscription_list_scolastic";

//param - student_id,exam_category_id,subscription_id,no_set,no_module,no_mock,exam_type_id,class,cart_amount
export const POST_ADD_TO_CART_API = "lms/subscribe/addtocart";

//param - exam_type,class_id
export const POST_GET_CART_LIST_API = "lms/subscribe/getcartstlist";

//param - null
export const GET_PURCHASED_TRANSCTION_LIST_API = "lms/subscribe/getpayment_translist";

//param - payment_trans_id
export const GENERATE_INVOICE_API = "lms/subscribe/generateinvoicepdf";

//param - student_id,subscription_details, amount_paid, subscribtion_payment_trans_id
export const POST_PURCHASED_SUBSCRIPTION_API = "lms/subscribe/purchased_subscription";

//param - student_id
export const POST_REMOVE_ALL_SUBSCRIBE_CART_API = "lms/subscribe/delete_allcart";

//param - student_id,id
export const POST_REMOVE_SUBSCRIBE_CART_API = "lms/subscribe/delete_addtocart";

//param - chapter, board, standard, branch
export const POST_SET_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_API = "lms/exams/getscholasticexamsdetails_set"; 

//param - student_id, exam_unique_id, exam_type(1 = Set,2 = module,3= Mock), branch, chapter, set_no,  examdata[], 
export const POST_STORE_ONLINE_EXAM_QUESTIONS_ANSWERS_SCHOLASTIC_EXAM_API = "lms/exams/storeonlineexamanswers";

//param - student_id
export const POST_DEMO_ASSESSMENT_LIST_API = "lms/exams/getdemoexamgivencount";

//param - exam_unique_id, subject_id, branch_id, set_no
export const POST_EXAM_COMPLETED_LIST_API = "lms/exams/examcompletedlist";

//param - student_id, "exam_unique_id
export const POST_EXAM_ONLINE_ASSESSMENT_SCHOLASTIC_LIST_API = "lms/exams/onlineexamassessmentlist_scholastic";

//param - board, standard, subject_id
export const POST_MODULE_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_LIST_API = "lms/exams/getscholasticexamsdetails_module";

//param - board, standard, subject_id
export const POST_MOCK_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_LIST_API = "lms/exams/getscholasticexamsdetails_mock";

//param - exam_type, standard, subject_id,
export const POST_ONLINE_COMPETITIVE_EXAM_QUESTIONS_LIST_API = "lms/exams/onlineexamcompetitive";

//param - student_id, exam_type
export const POST_PURCHASED_COMPETITITVE_DETAILS_API = "lms/exams/getpurchased_competitivelist";

//param - student_id, subscription_id, exam_type, set_no, examdata[]
export const POST_STORE_ONLINE_EXAM_QUESTIONS_ANSWERS_COMPETITIVE_API = "lms/exams/storeonlineexamanswers_competitive";

//param - student_id, exam_unique_id
export const POST_ONLINE_ASSESSMENT_EXAM_DETAILS_COMPETIVE_API = "lms/exams/onlineexamassessmentlist_competitive";

//param - exam_category_id, branch_id, class_id, chapter_id, exam_type_id, board_id
export const POST_ELIBRARY_CONTENT_API = "lms/getelibrarycontent";

//param - userid
export const POST_DEMO_ELIBRARY_CONTENT_API = "lms/getelibrarycontent_demo";

//param - userid
export const GET_PURCHASED_ELIBRARY_CONCEPT_MAP_API = "lms/elibrary/getpurchasedelibrarycontent";

//param - 
export const GET_EVENT_HISTORY_API = "lms/geteventhistory";

//param - 
export const LIKE_EVENT_HISTORY_API = "lms/storelikerecord";



//param - message, password
export const POST_GENERATE_NEW_PASSWORD_API = "lms/generatepassword";

//param - student_id, subject_id
export const POST_PERFORMANCE_SCORE_LIST_API = "lms/performance/getexamscholasticperformance";

//param - profile_pic, fname, lname, dob, email, gender, address, pincode, mobile, standard, board, school_name, school_address, password
export const UPDATE_PROFILE_DETAILS_LIST_API = "lms/updatestudentprofile";

//param - student_id
export const POST_SCHOLASTIC_OVERALL_PERFORMANCE_API = "lms/performance/getscholasticoverallperformance";

//param - student_id
export const POST_SCHOLASTIC_AVERAGE_PERFORMANCE_API = "lms/performance/getscholasticaverageperformance";

//param - student_id
export const POST_SCHOLASTIC_AVERAGE_PERFORMANCE_SET_MODULE_MOCK_API = "lms/performance/getscholasticaverageperformance_set_module_mock";

//param - student_id
export const POST_COMPARATIVE_STUDY_CHAPTERWISE_API = "lms/performance/getcomparative_studysetexam_chapterwise_set";

//param - student_id
export const POST_COMPARATIVE_OVERALL_PERFORMANCE_API = "lms/performance/getcompetitive_overall_score";

//param - student_id
export const POST_COMPARATIVE_SET_WISE_SCORE_API = "lms/performance/getcompetitive_setwise_score_ntse";

//param - student_id
export const POST_SCHOLASTIC_PERFORMANCE_MODULE_API = "lms/performance/getexamscholasticperformance_module";

//param - student_id
export const POST_SCHOLASTIC_PERFORMANCE_MOCK_API = "lms/performance/getexamscholasticperformance_mock";

//param - student_id
export const POST_COMPARATIVE_STUDY_MODULERWISE_API = "lms/performance/getcomparative_studysetexam_module";

//param - student_id
export const POST_COMPARATIVE_STUDY_MOCKRWISE_API = "lms/performance/getcomparative_studysetexam_mock";

//param - student_id
export const POST_COMPARE_DIFFARENT_SUBJECT_SCORE_NTSE_API = "lms/performance/getcompare_diffarent_subject_score_ntse";

//param - student_id
export const POST_COMPETITIVE_SPECIFIC_SETWISE_SCORE_NTSE_API = "lms/performance/getcompetitive_specific_setwise_score_ntse";

//param - 
export const POST_SUBSCRIPTION_SCROLLING_TEXT_API = "lms/subscribe/get_setting_data";

//param - 
export const POST_SCHOLASTIC_COMBINATION_PRICE_API = "lms/subscribe/getscholasticsubscribtion_combination_price";

//param - search_text
export const POST_SEARCH_TEXT_API = "lms/search/searchquestions";

//param - exam_category, exam_type_id
export const POST_NTSE_TYPE_API = "lms/getsubexamtype";



//param - token
export const POST_SCHOLASTIC_SET_MODULE_MOCK_SUBJECT_WISE_API = "lms/performance/getscholasticstrengthanalysis";

//param - exam_type_id
export const GET_COMPETITIVE_SUBJECT_LIST_API = "lms/getcompetitivesubject";

//param - student_id
export const GET_COMPETITIVE_SETWISE_SCORE_API = "lms/performance/getcompetitive_setwise_score";

//param -
export const POST_PAYMENTCALL_API = "lms/subscribe/paymentcall";

//param -
export const POST_SCHOLASTIC_GETSUBJECTWISE_CHAPTERS_API = "lms/performance/scholastic_getsubjectwise_chapters";

//param -
export const POST_AFTER_PURCHASED_GET_PURCHASED_DETAILS_API = "lms/subscribe/getsubscriptiondetails";

//param -
export const POST_SCHOLASTIC_GETCHAPTERWISE_ANALYSIS_API = "lms/performance/scholastic_getchapterwise_analysis";

//param -
export const POST_COMPARE_SCHOLASTIC_COMPETITIVE_API = "lms/performance/compare_scholastic_competitive";

//param -
export const POST_GETCOMPETITIVE_SUBJECT_AVGSCORE_API = "lms/performance/getcompetitive_subject_avgscore";

//param -
export const POST_GETCOMPETITIVE_SETWISE_SAT_MAT_SCORE_API = "lms/performance/getcompetitive_setwise_sat_mat_score";

//param -
export const POST_COMPETITIVE_SETWISE_SAT_MAT_SCORE_SUBJECT_API = "lms/performance/getcompetitive_setwise_sat_mat_score_subject";

//param -
export const POST_GETCOMPETITIVE_SUBJECTWISECOMPARISON_API = "lms/performance/getcompetitive_subjectwisecomparison";

//param -
export const POST_GETCOMPETITIVE_NONVERBALCOMPARISON_API = "lms/performance/getcompetitive_nonverbalcomparison";

//param -
export const POST_ELIBRARY_GETSUBJECT_LIST_API = "lms/elibrary/getsubjectlist";

//param -
export const POST_TERMS_CONDITION_API = "lms/terms_condition";

//param -
export const POST_PRIVACY_POLICY_API = "lms/privacy_policy";

//param -
export const GET_EXAM_ASSESSMENT_LIST_API = "lms/exams/getexamassessmentlist";

//param -
export const POST_STORE_ELIBRARY_TIME_SPEND_API = "lms/elibrary/storeelibrarytimespend";

//param -
export const POST_ELIBRARY_SESSION_TIME_API = "lms/performance/elibrary_session_time";

//param -
export const POST_ELIBRARY_MOST_VISITED_SUBJECTS_API = "lms/performance/elibrary_most_visited_subjects";

//param -
export const POST_ELIBRARY_MOST_SEARCH_QUESTIONS_API = "lms/performance/elibrary_most_search_questions";

//param -
export const POST_GETSUBSCRIBED_LIST_API = "lms/subscribe/getsubscribed_list";

//param -
export const POST_INTERM_STORE_ONLINE_EXAM_ANSWERS_API = "lms/exams/interm_storeonlineexamanswers";

//param -
export const POST_GET_FEEDBACK_API = "lms/get_feedback";

//param -
export const POST_STORE_FEEDBACK_API = "lms/store_feedback";

//param -
export const POST_FEEDBACK_GIVEN_API = "lms/get_feedback_status";

//param -
export const POST_GETSCHOLASTICEXAMSDETAILS_CASESTUDY_API = "lms/exams/getscholasticexamsdetails_casestudy";

//param -
export const POST_WHERE_DO_YOU_STAND_COMPETITIVE_API = "lms/performance/wheredoyoustand_competitive";

//param -
export const POST_GET_LAST_PAYMENT_DETAILS_API = "lms/subscribe/getlastpaymentdetails";

//param
export const POST_STORE_OTP_VERIFCATION_STATUS_API = "lms/store_otp_verifcation_status";

//param
export const POST_SEND_OTP_BEFORE_LOGIN_SCREEN_API = "lms/sendpreloginotp";

//param
export const POST_GET_ALLEXAM_CATEGORIES_API = "lms/getallexamcategories";

//param
export const POST_GET_INTEGRATED_SUBSCRIPTION_API = "lms/subscribe/getintegratedsubscription";

//param : subject_id, chapter_shortcode
export const POST_STORE_ELIBRARY_VISIT_API = "lms/elibrary/storeelibraryvisit";

//param : 
export const POST_DASHBOARD_PERFORMANCESCORE_API = "lms/dashboard_performancescore";

//param : 
export const POST_DASHBOARD_LOGINDATA_API = "lms/dashboard_logindata";

//message : 
export const POST_CHECK_PASSWORD_LINK_EXIST_API = "lms/checkpasswordlinkexist";

//message : 
export const POST_GET_EXAM_DETAILS_BY_EXAM_NO_API = "lms/exams/getexamdetails_byexamno";

// 
export const POST_GET_PURCHASED_GROUP_LIST_API = "lms/exams/getpurchased_grouplist";

// 
export const POST_GET_PURCHASED_SUBJECTS_LIST_SCHOLASTIC_API = "lms/exams/getpurchased_subjectslist_scholastic";

export const POST_SCHOLASTIC_GETSUBJECTWISE_CHAPTERS_TABLE_DATA_API = "lms/performance/scholastic_getsubjectwise_chapters_table_data";

//param - token
export const POST_SUBJECT_WISE_SCHOLASTIC_SCORE_API = "lms/performance/subjectwisescholasticscore";

//param - token
export const POST_GET_EXAM_CATEGORIES_LIBRARY_API = "lms/getexamcategories_library";

//param - token
export const POST_GET_EXAM_TYPE_LIBRARY_API = "lms/getexamtype_library";

//param - token
export const POST_UPDATE_PROFILE_IMAGE_API = "lms/updatestudentprofileimage";

//param - token
// export const CART_API = "http://192.168.0.139:4000/mobile/v1/api/payment/initiateJuspayPayment";
export const CART_API = "payment/initiateJuspayPayment";

//param - token
export const CART_SUCCESS_API = "payment/handleJuspayResponse";

//param -
export const POST_SCHOLASTIC_GETCHAPTERWISE_ANALYSIS_CASE_STUDY_API = "lms/performance/scholastic_getchapterwise_analysis_case_study";

//param -
export const POST_AWS_CREDENTIALS_DETAILS_API = "lms/elibrary/aws_credentials_details";

//param -
export const POST_GET_ADVERTISEMENT_API = "lms/getadvtisements";

//param -
export const POST_SUBMIT_FEEDBACK_API = "lms/submitfeedback";

//param - category,board_id
export const GET_ACADEMIC_SESSION_EXIST_OR_EXPIRES_API = "lms/exams/check_academic_session_exist";

//param - board_id
export const GET_ACADEMIC_YEAR_BY_BOARD_ID_API = "lms/getacademicsessions_list";

//param
export const GET_PROFILE_DETAILS_BY_ID_API = "lms/getstudentdetails_byid";

//param - null
export const GET_CLASS_STANDARD_LIST_AFTER_LOGIN_API = "lms/master/getclasseslist_after_login";

//param - 
export const SEND_VERIFICATION_OTP_UPDATE_CLASS_API = "lms/send_verification_otp_update_class";


//Archive-------------------------------------
//param - null
export const GET_ARCHIVE_STANDARD_LIST_API = "lms/master/getclasseslist_archive";

//param - null
export const GET_ARCHIVE_EXAM_CATEGORIES_API = "lms/getexamcategories_archive";

//param - null
export const GET_ARCHIVE_EXAM_CATEGORIES_LIBRARY_API = "lms/getexamcategories_library_archive";

// param - class
export const POST_ARCHIVE_PURCHASED_GROUP_LIST_API = "lms/exams/getpurchased_grouplist_archive";

//param - token
export const POST_ARCHIVE_EXAM_TYPE_API = "lms/getexamtype_archive";

//param - token
export const POST_ARCHIVE_SCHOLASTIC_SET_MODULE_MOCK_SUBJECT_WISE_API = "lms/performance_archive/getscholasticstrengthanalysis";

//param -
export const POST_ARCHIVE_COMPARE_SCHOLASTIC_COMPETITIVE_API = "lms/performance_archive/compare_scholastic_competitive";

//param - student_id,class
export const POST_ARCHIVE_SCHOLASTIC_OVERALL_PERFORMANCE_API = "lms/performance_archive/getscholasticoverallperformance";

//param - group_subject_id,class
export const POST_ARCHIVE_SUBJECT_WISE_SCHOLASTIC_SCORE_API = "lms/performance_archive/subjectwisescholasticscore";

//param - group_subject_id,class
export const POST_ARCHIVE_SCHOLASTIC_GETSUBJECTWISE_CHAPTERS_API = "lms/performance_archive/scholastic_getsubjectwise_chapters";

//param - group_subject_id,class
export const POST_ARCHIVE_SCHOLASTIC_GETSUBJECTWISE_CHAPTERS_TABLE_DATA_API = "lms/performance_archive/scholastic_getsubjectwise_chapters_table_data";

//param - class
export const POST_ARCHIVE_SCHOLASTIC_GETCHAPTERWISE_ANALYSIS_API = "lms/performance_archive/scholastic_getchapterwise_analysis";

//param -
export const POST_ARCHIVE_SCHOLASTIC_GETCHAPTERWISE_ANALYSIS_CASE_STUDY_API = "lms/performance_archive/scholastic_getchapterwise_analysis_case_study";

//param - student_id,class
export const GET_ARCHIVE_COMPETITIVE_SETWISE_SCORE_API = "lms/performance_archive/getcompetitive_setwise_score";

//param - class
export const POST_ARCHIVE_GETCOMPETITIVE_SUBJECT_AVGSCORE_API = "lms/performance_archive/getcompetitive_subject_avgscore";

//param - student_id,class
export const POST_ARCHIVE_COMPARATIVE_OVERALL_PERFORMANCE_API = "lms/performance_archive/getcompetitive_overall_score";

//param -
export const POST_ARCHIVE_COMPETITIVE_SETWISE_SAT_MAT_SCORE_API = "lms/performance_archive/getcompetitive_setwise_sat_mat_score";

//param -
export const POST_ARCHIVE_COMPETITIVE_SETWISE_SAT_MAT_SCORE_SUBJECT_API = "lms/performance_archive/getcompetitive_setwise_sat_mat_score_subject";

//param -
export const POST_ARCHIVE_GETCOMPETITIVE_SUBJECTWISECOMPARISON_API = "lms/performance_archive/getcompetitive_subjectwisecomparison";

//param - class
export const POST_ARCHIVE_COMPETITIVE_NONVERBALCOMPARISON_API = "lms/performance_archive/getcompetitive_nonverbalcomparison";

//param - class
export const POST_ARCHIVE_WHERE_DO_YOU_STAND_COMPETITIVE_API = "lms/performance_archive/wheredoyoustand_competitive";

//param - class
export const POST_ARCHIVE_ELIBRARY_SESSION_TIME_API = "lms/performance_archive/elibrary_session_time";

//param - class
export const POST_ARCHIVE_ELIBRARY_MOST_VISITED_SUBJECTS_API = "lms/performance_archive/elibrary_most_visited_subjects";

//param -
export const POST_ARCHIVE_ELIBRARY_MOST_SEARCH_QUESTIONS_API = "lms/performance_archive/elibrary_most_search_questions";

//param - token
export const POST_ARCHIVE_EXAM_TYPE_LIBRARY_API = "lms/getexamtype_library_archive";

//param - token
export const POST_UPDATE_STUDENT_PROFILE_OF_SUBSCRIPTION_API = "lms/updatestudentprofilefosubscription";