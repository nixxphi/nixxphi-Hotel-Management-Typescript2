export default {
    PAGENOTFOUND: (req, res) => res.json({
        success: false,
        message: "You're looking for a resource that does not exist"
    })
}