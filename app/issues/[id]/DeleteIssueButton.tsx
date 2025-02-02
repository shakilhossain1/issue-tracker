"use client"

import {AlertDialog, Button, Flex} from "@radix-ui/themes";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Spinner} from "@/app/components";

const DeleteIssueButton = ({issueId}: { issueId: number }) => {
    const router = useRouter();
    const [error, setError] = useState(false)
    const [isDeleting, setDeleting] = useState(false)


    const delteIssue = async () => {
        try {
            setDeleting(true)
            await axios.delete('/api/issues/' + issueId);
            router.push('/issues/list');
            router.refresh();
        } catch (error) {
            setDeleting(false)
            console.log(error);
            setError(true);
        }
    }

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color='red' disabled={isDeleting}>
                        Delete Issue
                        {isDeleting && <Spinner/>}
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content maxWidth="450px">
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        Are you sure you want to delete this issue? This action cannot be undone.
                    </AlertDialog.Description>

                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button
                                variant="solid"
                                color="red"
                                onClick={delteIssue}
                            >
                                Delete
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content maxWidth="450px">
                    <AlertDialog.Title size="2">Error</AlertDialog.Title>
                    <AlertDialog.Description size="2">This issue could not be deleted</AlertDialog.Description>
                    <Button variant="soft" color="gray" mt='2' onClick={() => setError(false)}>OK</Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default DeleteIssueButton;