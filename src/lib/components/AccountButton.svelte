<script>
	import { CircleUserRound, LogIn } from "lucide-svelte";
	import { isAuthenticated, username, experience, supporterLevel, signupPopupOpen } from "$lib/stores/accountData.js";

	function logOut() {
		isAuthenticated.set(false);
		localStorage.removeItem("bearer");
		localStorage.removeItem("id");
	}

	function openSignin() {
		signupPopupOpen.set(true);
	}
</script>

{#if $isAuthenticated}
	<div class="dropdown dropdown-top dropdown-end">
		<div tabindex="0" role="button" class="btn">
			<CircleUserRound />
		</div>
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<ul
			tabindex="0"
			class="dropdown-content menu bg-base-100 border border-accent rounded-box z-[1] w-56 p-2 shadow-md mb-3"
		>
			<div class="flex justify-center items-center mb-5 flex-col gap-x-2">
				<h3 class="font-bold text-lg text-wrap truncate max-w-36 text-center">
					Hey, {$username}
				</h3>
				<p>{$experience.toLocaleString()} XP</p>
				{#if $supporterLevel > 0}
					<div class="badge badge-outline text-xs mt-0.5">
						TIER {$supporterLevel} SUPPORTER
					</div>
				{/if}
			</div>
			<div class="bg-base-200 rounded-md p-2 text-center mb-3">
				View and manage your account on the main OpenGuessr site.
			</div>
			<li>
				<button class="btn btn-primary text-white" onclick={logOut}>Log out</button>
			</li>
		</ul>
	</div>
{:else}
	<button class="btn" onclick={openSignin}>Log in <LogIn /></button>
{/if}
