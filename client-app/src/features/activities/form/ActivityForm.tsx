import { Button, Segment } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Link, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/Common/form/MyTextInput';
import MyTextArea from '../../../app/Common/form/MyTextArea';
import MySelectInput from '../../../app/Common/form/MySelectInput';
import { categoryOptions } from '../../../app/Common/options/categoryOptions';
import MyDateInput from '../../../app/Common/form/MyDateInput';
import { Activity } from '../../../app/models/activity';

export default observer(function ActivityForm() {
	const { activityStore } = useStore();
	const {
		loading,
		// createActivity,
		// updateActivity,
		loadActivity,
		loadingInitial,
	} = activityStore;
	const { id } = useParams();

	const INIT = {
		id: '',
		title: '',
		category: '',
		description: '',
		date: null,
		city: '',
		venue: '',
	};
	const [activity, setActivity] = useState<Activity>(INIT);

	const validationSchema = Yup.object({
		title: Yup.string().required('The activity title is required'),
		description: Yup.string().required('The activity description is required'),
		category: Yup.string().required(),
		date: Yup.string().required(),
		city: Yup.string().required(),
		venue: Yup.string().required(),
	});

	useEffect(() => {
		if (id) loadActivity(id).then((activity) => setActivity(activity!));
	}, [id, loadActivity]);

	if (loadingInitial) return <LoadingComponent />;

	// function handleSubmit() {
	//   if (!activity.id) {
	//     activity.id = uuid();
	//     createActivity(activity).then(() =>
	//       navigate(`/activities/${activity.id}`)
	//     );
	//   } else updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
	// }

	// function handleChange(
	//   e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	// ) {
	//   const { name, value } = e.target;
	//   setActivity(prev => ({ ...prev, [name]: value }));
	// }

	return (
		<Segment clearing>
			{/* to update the form values when the initialValues get updated we need to use the enableReinitialize prop here. */}
			<Formik
				validationSchema={validationSchema}
				enableReinitialize
				initialValues={activity}
				onSubmit={(values) => console.log(values)}
			>
				{({ handleSubmit }) => (
					<Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
						<MyTextInput name="title" placeholder="Title" />
						<MyTextArea
							rows={3}
							placeholder="Description "
							name="description"
						/>
						<MySelectInput
							options={categoryOptions}
							placeholder="Category"
							name="category"
						/>
						<MyDateInput
							name="date"
							placeholderText="Date"
							showTimeSelect
							timeCaption="time"
							dateFormat="MMMM d, yyyy h:mm aa"
						/>
						<MyTextInput name="city" placeholder="City" />
						<MyTextInput name="venue" placeholder="Venue" />
						<Button loading={loading} floated="right" positive type="submit">
							Submit
						</Button>
						<Button as={Link} to="/activities" floated="right" type="button">
							Cancel
						</Button>
					</Form>
				)}
			</Formik>
		</Segment>
	);
});
