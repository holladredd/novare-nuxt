import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield, UserPlus, Trash2, Lock } from "lucide-react";
import { toast } from "sonner";
import type { TeamMember } from "@/types/settings";
import { mockTeamMembers } from "@/types/settings";

interface Props {
  userRole: "owner" | "admin" | "manager" | "staff";
}

const roleBadgeVariant: Record<string, "default" | "secondary" | "outline"> = {
  owner: "default",
  admin: "default",
  manager: "secondary",
  staff: "outline",
};

const TeamMembersTab = ({ userRole }: Props) => {
  const [members, setMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [inviteEmail, setInviteEmail] = useState("");

  const canManageTeam = userRole === "owner" || userRole === "admin";

  if (!canManageTeam) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Lock className="w-7 h-7 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-1">Access Restricted</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          You don't have permission to view team members. Contact your admin for
          access.
        </p>
      </div>
    );
  }

  const handleInvite = () => {
    if (
      !inviteEmail.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail)
    ) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail("");
  };

  const handleRemove = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    toast.success("Team member removed");
  };

  return (
    <div className="space-y-6">
      {/* Invite */}
      <Card className="border-0 shadow-md shadow-foreground/5">
        <CardContent className="p-4 flex gap-3">
          <Input
            placeholder="Email address"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleInvite} size="sm">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite
          </Button>
        </CardContent>
      </Card>

      {/* Members List */}
      <div className="space-y-3">
        {members.map((member) => (
          <Card
            key={member.id}
            className="border-0 shadow-sm shadow-foreground/5"
          >
            <CardContent className="p-4 flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-accent text-accent-foreground text-sm font-medium">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{member.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {member.email}
                </p>
              </div>
              {member.role === "owner" ? (
                <Badge
                  variant={roleBadgeVariant[member.role]}
                  className="capitalize gap-1"
                >
                  <Shield className="w-3 h-3" />
                  {member.role}
                </Badge>
              ) : (
                <>
                  <Select
                    value={member.role}
                    onValueChange={(value: "admin" | "manager" | "staff") => {
                      setMembers((prev) =>
                        prev.map((m) =>
                          m.id === member.id ? { ...m, role: value } : m,
                        ),
                      );
                      toast.success(
                        `${member.name}'s role updated to ${value}`,
                      );
                    }}
                  >
                    <SelectTrigger className="w-[120px] h-8 text-xs capitalize">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive h-8 w-8"
                    onClick={() => handleRemove(member.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamMembersTab;
