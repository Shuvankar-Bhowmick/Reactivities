import { Button, FormField, Label, Segment } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Link, useParams } from 'react-router-dom';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
		date: '',
		city: '',
		venue: '',
	};
	const [activity, setActivity] = useState(INIT);

	const validationSchema = Yup.object({
		title: Yup.string().required('The activity title is required'),
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
						<FormField>
							<Field name="title" placeholder="Title" />
							<ErrorMessage
								name="title"
								render={(err) => <Label basic color="red" content={err} />}
							/>
						</FormField>
						<Field placeholder="Description " name="description" />
						<Field placeholder="Category" name="category" />
						<Field name="date" type="date" placeholder="Date" />
						<Field name="city" placeholder="City" />
						<Field name="venue" placeholder="Venue" />
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
