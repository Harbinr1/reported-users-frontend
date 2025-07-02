
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { ReportedUser, ActionFormData } from '@/types/ReportedUsersTypes';

interface ReportedUsersDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedReport: ReportedUser | null;
  onTakeAction: (values: ActionFormData) => void;
}

const ReportedUsersDialog = ({ isOpen, onClose, selectedReport, onTakeAction }: ReportedUsersDialogProps) => {
  const form = useForm<ActionFormData>({
    defaultValues: {
      action: '',
      notes: '',
    }
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="border-orange-500 text-orange-700">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="border-gray-500 text-gray-700">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleTakeAction = (values: ActionFormData) => {
    onTakeAction(values);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Report Details</DialogTitle>
          <DialogDescription>
            Review the report and take appropriate action
          </DialogDescription>
        </DialogHeader>

        {selectedReport && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Reported User</label>
                <p className="text-sm">{selectedReport.userName}</p>
                <p className="text-xs text-gray-500">{selectedReport.userEmail}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Reported By</label>
                <p className="text-sm">{selectedReport.reportedBy}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Reason</label>
                <p className="text-sm">{selectedReport.reportReason}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Location</label>
                <p className="text-sm">{selectedReport.location}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Severity</label>
                <div className="mt-1">{getSeverityBadge(selectedReport.severity)}</div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <p className="text-sm mt-1 p-3 bg-gray-50 rounded-md">{selectedReport.description}</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleTakeAction)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="action"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Action to Take</FormLabel>
                      <FormControl>
                        <select {...field} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                          <option value="">Select an action</option>
                          <option value="warning">Issue Warning</option>
                          <option value="suspend">Suspend Account</option>
                          <option value="ban">Ban User</option>
                          <option value="dismiss">Dismiss Report</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Action Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add notes about the action taken..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit">Take Action</Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReportedUsersDialog;
