<!-- @format -->

<script lang="ts">
interface user {
	gender: string;
	name: string;
	surname: string;
	email: string;
	profilepicture: string;
}
export default {
	name: "test",
	props: {
		amountOfAccounts: {
			type: Number,
			default: 10,
		},
	},
	data() {
		return {
			Users: [],
		};
	},

	methods: {
		onUpdate() {
			this.Users = [];
			fetch(`https://randomuser.me/api/?results=` + this.amountOfAccounts)
				.then((response) => response.json())
				.then((data) =>
					data.results.map((e) =>
						this.Users.push({
							gender: e.gender,
							name: e.name.first,
							surname: e.name.last,
							email: e.email,
							profilepicture: e.picture.medium,
						})
					)
				)
				.catch((error) => console.log(error + "🚫"));
		},
	},

	created() {
		this.onUpdate();
	},
};
</script>

<template>
	<input type="number" v-model="amountOfAccounts" v-on:change="onUpdate()" />
	<div class="container">
		<div v-for="item in Users" :class="item.gender" class="person">
			<img :src="item.profilepicture" />
			<h1>{{ item.name + " " + item.surname }}</h1>
			<p>{{ item.email }}</p>
		</div>
	</div>
</template>

<style>
.container {
	display: flex;
	padding: 10px;
	flex-wrap: wrap;
}

.person {
	border: solid 2px;
	border-radius: 25px;
	margin: 10px;
	text-align: center;
	flex-grow: 2;
}

.person img {
	border: solid 5px;
	border-radius: 25px;
}

.male {
	color: steelblue;
}

.male img {
	border-color: steelblue;
}

.female {
	color: pink;
}

.female img {
	border-color: pink;
}
</style>
