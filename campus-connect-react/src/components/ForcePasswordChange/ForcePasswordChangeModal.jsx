import { useState } from 'react';
import { KeyRound, Eye, EyeOff, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { authApi } from '../../services/api';
import './ForcePasswordChangeModal.css';

export default function ForcePasswordChangeModal() {
  const { user, updateUser } = useAuth();
  const showToast = useToast();

  const [currentPassword, setCurrentPassword] = useState('Password1234');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  // Show only if user is logged in, must change password, and not temporarily dismissed
  if (!user || !user.mustChangePassword || dismissed) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!currentPassword) {
      setErrorMsg('Please enter your current temporary password.');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('New password and confirmation do not match.');
      return;
    }
    if (newPassword === currentPassword) {
      setErrorMsg('New password must be different from your temporary password.');
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.changePassword({
        current_password: currentPassword,
        new_password: newPassword,
      });

      if (res && res.error) {
        setErrorMsg(res.error || 'Failed to change password. Please verify current password.');
      } else {
        showToast('Password updated successfully! Your account is secured 🎉', 'success', 4000);
        updateUser({ mustChangePassword: false });
      }
    } catch (err) {
      setErrorMsg(err?.message || 'Network error updating password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fpcm-overlay">
      <div className="fpcm-card" role="dialog" aria-labelledby="fpcm-title">
        <div className="fpcm-header">
          <div className="fpcm-header-icon">
            <KeyRound size={24} />
          </div>
          <div>
            <h2 id="fpcm-title" className="fpcm-title">
              Update Temporary Password
            </h2>
            <p className="fpcm-subtitle">
              Your account was created with a temporary password (<code>Password1234</code>). Set a personal password to secure your account.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="fpcm-body">
          {errorMsg && (
            <div className="fpcm-error">
              <AlertCircle size={18} />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="fpcm-form-group">
            <label className="fpcm-label">Current / Temporary Password</label>
            <div className="fpcm-input-wrap">
              <input
                type={showCurrentPw ? 'text' : 'password'}
                className="fpcm-input"
                placeholder="Temporary password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="fpcm-pw-toggle"
                onClick={() => setShowCurrentPw(!showCurrentPw)}
                aria-label="Toggle password visibility"
              >
                {showCurrentPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="fpcm-form-group">
            <label className="fpcm-label">New Password</label>
            <div className="fpcm-input-wrap">
              <input
                type={showNewPw ? 'text' : 'password'}
                className="fpcm-input"
                placeholder="At least 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="fpcm-pw-toggle"
                onClick={() => setShowNewPw(!showNewPw)}
                aria-label="Toggle password visibility"
              >
                {showNewPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="fpcm-form-group">
            <label className="fpcm-label">Confirm New Password</label>
            <div className="fpcm-input-wrap">
              <input
                type="password"
                className="fpcm-input"
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="fpcm-actions">
            <button
              type="button"
              className="fpcm-btn-secondary"
              onClick={() => setDismissed(true)}
              disabled={loading}
            >
              Remind Me Later
            </button>
            <button
              type="submit"
              className="fpcm-btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="fpcm-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  Save New Password
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
