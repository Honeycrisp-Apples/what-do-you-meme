import React from 'react';
import firebase from 'firebase';

export default async function SendFriendRequests(user, currentUser) {
	// console.log('placeholder');
	let newRequest = {
		userID: currentUser.ref.id,
		picture: currentUser.data().imageURL,
		name: currentUser.data().displayName
	};
	console.log('User:', user);
	console.log('CurrentUser:', currentUser);

	console.log(newRequest);
	await user.ref.update({
		requests: firebase.firestore.FieldValue.arrayUnion(newRequest)
	});
}
