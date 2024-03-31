import {
	Button,
	Form,
	FormInput,
	FormTextArea,
	Segment,
} from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Link, useParams } from 'react-router-dom';
import { Formik } from 'formik';

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
				enableReinitialize
				initialValues={activity}
				onSubmit={(values) => console.log(values)}
			>
				{({ values: activity, handleChange, handleSubmit }) => (
					<Form onSubmit={handleSubmit} autoComplete="off">
						<FormInput
							name="title"
							placeholder="Title"
							value={activity.title}
							onChange={handleChange}
						></FormInput>
						<FormTextArea
							placeholder="Description "
							name="description"
							value={activity.description}
							onChange={handleChange}
						></FormTextArea>
						<FormInput
							placeholder="Category"
							name="category"
							value={activity.category}
							onChange={handleChange}
						></FormInput>
						<FormInput
							name="date"
							type="date"
							placeholder="Date"
							value={activity.date}
							onChange={handleChange}
						></FormInput>
						<FormInput
							name="city"
							placeholder="City"
							value={activity.city}
							onChange={handleChange}
						></FormInput>
						<FormInput
							name="venue"
							placeholder="Venue"
							value={activity.venue}
							onChange={handleChange}
						></FormInput>
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
