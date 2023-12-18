// page.tsx
import { GetServerSideProps } from 'next';
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from '@/app/actions/getListingById'; // Adjust the import path as needed
import getReservations from "@/app/actions/getReservations";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import ListingClient from "./ListingClient";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  try {
    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
      return (
        <ClientOnly>
          <EmptyState />
        </ClientOnly>
      );
    }

    return (
      <ClientOnly>
        <ListingClient
          listing={listing}
          reservations={reservations}
          currentUser={currentUser}
        />
      </ClientOnly>
    );
  } catch (error) {
    console.error("An error occurred:", error);

    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }
};


export { getListingById };

export default ListingPage;
