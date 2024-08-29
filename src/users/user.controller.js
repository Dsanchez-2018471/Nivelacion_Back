
exports.updatePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(userId);
        const isMatch = await user.comparePassword(currentPassword);

        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña actual incorrecta' });
        }

        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando la contraseña', error });
    }
};

  