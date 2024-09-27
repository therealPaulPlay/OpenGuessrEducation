<script>
    import "../app.css";
    import Sidebar from '$lib/components/Sidebar.svelte';
  
  </script>
  
  <div class="flex h-screen bg-base-100 dark:bg-base-900">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Main Content Area -->
    <div class="flex-1 relative p-6">
  
      <!-- The main content where route content will be displayed -->
      <main class="mt-12">
        <slot />
      </main>
    </div>
  </div>  