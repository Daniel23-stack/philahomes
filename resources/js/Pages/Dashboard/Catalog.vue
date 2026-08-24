<script setup>
import { Head, Link } from '@inertiajs/vue3';
import ClientLayout from '@/Layouts/ClientLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';
import { formatMoney, formatSlug } from '@/utils/admin';

defineProps({ items: Array, serviceCategories: Object });
</script>

<template>
  <Head title="Service catalog" />
  <ClientLayout title="Service catalog" subtitle="Browse available services, prices, and add-ons.">
    <AdminCard title="Available services" outline flush>
      <template #tools>
        <Link href="/dashboard/catalog/retired" class="btn-lte btn-lte-secondary">View retired services</Link>
      </template>

      <div v-if="items?.length" class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Service</th>
              <th>Description</th>
              <th>Base price</th>
              <th>Add-ons</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id" class="admin-table__row">
              <td class="text-capitalize">{{ formatSlug(item.service_category) }}</td>
              <td><strong>{{ item.name }}</strong></td>
              <td style="max-width: 18rem">{{ item.description || '—' }}</td>
              <td>{{ formatMoney(item.base_price) }}</td>
              <td>
                <ul v-if="item.add_ons?.length" style="margin: 0; padding-left: 1rem; font-size: 0.8125rem">
                  <li v-for="addon in item.add_ons" :key="addon.id">
                    {{ addon.name }} — {{ formatMoney(addon.price) }}
                  </li>
                </ul>
                <span v-else class="text-muted">None</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="admin-empty">
        <p>No catalog items available right now.</p>
      </div>
    </AdminCard>

    <AdminCard title="Need something custom?" outline class="mb-4" style="margin-top: 1rem">
      <p class="mb-3" style="margin-bottom: 1rem">Don't see what you need? Submit a quote request and we'll get back to you.</p>
      <Link href="/#quote" class="btn-lte btn-lte-primary">Request a quote</Link>
    </AdminCard>
  </ClientLayout>
</template>
